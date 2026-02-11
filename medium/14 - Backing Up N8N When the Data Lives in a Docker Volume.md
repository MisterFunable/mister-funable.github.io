<!-- Source: https://funable.medium.com/backing-up-n8n-when-the-data-lives-in-a-docker-volume-62e200d79172 -->
<!-- Published: 2025-12-06T14:11:55 -->
# Backing Up N8N When the Data Lives in a Docker Volume

I got a new MacBook and wanted my N8N instance to come with me. So I needed to move my workflows and credentials under `n8n_data`, but yeah, where is it?

<!-- Image Source: https://miro.medium.com/1*ILHiHKOFMkgA_PMJEK-Stw.png | Local: images/14/img-01.png -->
![](images/14/img-01.png)

**Spoiler**: it was in a Docker-managed volume, not a local bind mount, so nothing showed up in Finder.

### My Compose File

The full file is available in the repository.

```yaml
volumes:
   - n8n_data:/home/node/.n8n
   - ./local-files:/files

volumes:
   n8n_data:
```

Notice the difference:

- `n8n_data:/home/node/.n8n` → Docker-managed **named volume**. Stored under Docker's data directory, not your project folder. Nice and tidy, totally invisible.

- `./n8n_data:/home/node/.n8n` → **bind mount**. Lives inside your repo, so you see the files and they get backed up with the rest of your stuff.

The dot makes sense. But we need to move things.

---

### Understanding Volume Names (Read This First)

This tripped me up. Docker Compose doesn't use the volume name from your compose file directly. It prefixes it with the **project folder name**.

So if your compose file says `n8n_data`

And you're running it from a folder called `local-n8n`, Docker creates a volume named `local-n8n_n8n_data`

Not `n8n_data`. Not `n8n-compose_n8n_data`. The actual name depends on **which folder you run docker compose from**.

This matters because:

- Old machine folder: `n8n-compose/` → volume: `n8n-compose_n8n_data`

- New machine folder: `local-n8n/`→ volume: `local-n8n_n8n_data`

If you restore to the wrong volume name, n8n won't see your data and you'll get the first-time setup screen. **Ask me how I know**.

Always check your actual volume names:

```bash
docker volume ls | grep n8n
```

---

### Quick Backup of a Named Volume

Find your volume name first:

```bash
docker volume ls | grep n8n
```

Write it down. You'll need the exact name (e.g., `local-n8n_n8n_data`).

Stop n8n so it doesn't write mid-backup:

```bash
docker compose down
```

Verify there's actually data in the volume. Replace `OLD_VOLUME_NAME` with your actual volume name from above:

```bash
docker run - rm -v OLD_VOLUME_NAME:/data alpine ls -la /data
```

You should see files like `config`, `database.sqlite`, `binaryData/`, etc. If it's empty, you have the wrong volume name.

Export to a tarball (again, replace with your actual volume name):

```bash
mkdir -p backups
docker run --rm \
  -v OLD_VOLUME_NAME:/data \
  -v "$(pwd)/backups:/backup" \
  alpine tar czf /backup/n8n_data.tar.gz -C /data .
```

Verify the backup has contents:

```bash
tar tzf backups/n8n_data.tar.gz | head -20
```

Should list files. If empty or error, something went wrong.

Move `backups/n8n_data.tar.gz` to the new machine however you like (AirDrop, rsync, _sneakernet_).

### Restore on the New Machine

In order:

- Copy the tarball somewhere accessible. I'll assume it's in the current directory.

- **Important**: Figure out what volume name your new setup will use. Run compose once to create it:

```bash
docker compose up -d
docker compose down
docker volume ls | grep n8n
```

- Write down the new volume name (e.g., `local-n8n_n8n_data`). This might be **different** from the old machine if your folder name changed.

- Unpack into the **new** volume. Replace `NEW_VOLUME_NAME` with your actual volume name:

```bash
docker run --rm \
  -v NEW_VOLUME_NAME:/data \
  -v "$(pwd):/backup" \
  alpine sh -c 'cd /data && rm -rf * && tar xzf /backup/n8n_data.tar.gz'
```

- Fix permissions. N8N runs as user `node` (uid 1000):

```bash
docker run - rm -v NEW_VOLUME_NAME:/data alpine chown -R 1000:1000 /data
```

- Remove stale SQLite journal files (can cause issues):

```bash
docker run - rm -v NEW_VOLUME_NAME:/data alpine rm -f /data/database.sqlite-shm /data/database.sqlite-wal
```

- Verify the data is there:

```bash
docker run - rm -v NEW_VOLUME_NAME:/data alpine ls -la /data
```

```yaml
# Output Example
total 41524
drwxr-sr-x    6 1000     1000          4096 Dec  6 02:30 .
drwxr-xr-x    1 root     root          4096 Dec  6 14:02 ..
drwxr-sr-x    2 1000     1000          4096 Oct 22 17:27 binaryData
-rw-------    1 1000     1000            56 Oct 22 17:27 config
-rw-r--r--    1 1000     1000      38006784 Dec  1 06:28 database.sqlite
-rw-r--r--    1 1000     1000         32768 Dec  6 02:30 database.sqlite-shm
-rw-r--r--    1 1000     1000       4152992 Dec  6 02:29 database.sqlite-wal
drwxr-sr-x    2 1000     1000          4096 Oct 22 17:27 git
-rw-r--r--    1 1000     1000        179938 Dec  5 19:13 n8nEventLog-1.log
-rw-r--r--    1 1000     1000             0 Dec  1 18:04 n8nEventLog-2.log
-rw-r--r--    1 1000     1000        114792 Dec  1 06:29 n8nEventLog-3.log
-rw-r--r--    1 1000     1000             0 Dec  6 02:29 n8nEventLog.log
drwxr-sr-x    3 1000     1000          4096 Dec  6 01:43 nodes
drwxr-sr-x    2 1000     1000          4096 Oct 22 17:27 ssh
```

You should see `database.sqlite`, `config`, `binaryData/`, etc.

- Bring N8N back up:

```typescript
docker compose up -d
```

Your workflows, credentials, and executions should be there. So you should see the login screen instead the first setup page.

---

## Notes and Gotchas

- **Volume names are prefixed.** Docker Compose uses `<projectfolder>_<volumename>`. The folder you run compose from determines the prefix. Always run `docker volume ls` to find the actual name.

- **Different folders = different volumes.** If you ran n8n from `n8n-compose/` on the old machine and `local-n8n/` on the new one, the volumes will have different names. You'll need to restore to the correct one.

- **Why Alpine?** It's a tiny Linux image (~5MB) that has `tar` built in. Using it keeps the backup/restore self-contained without installing anything on your host.

- **The tarball contains secrets.** Your credentials encryption key is in there. Keep it private.

- **SQLite journal files.** The `-shm` and `-wal` files are from a running database. Remove them after restore or SQLite might get confused.

- **Permissions matter.** n8n runs as uid 1000. If you restore as root, run `chown -R 1000:1000` or n8n can't write to its database.

- **On Docker Desktop for Mac/Windows**, the named volume lives inside Docker's VM. The tar approach keeps you from spelunking into hidden paths.

- **One more thing:** After restoring, you might need to re-authenticate some OAuth services like YouTube, Google Drive, or similar. The credentials are there, but the service tokens may have expired or need you to re-authorize access. Just reconnect them in the credentials panel and you're good.

That's all. The key lesson: **always check `docker volume ls`** to find the actual volume name. I restored to the wrong volume, got the setup screen, and spent 20 minutes debugging before I figured it out. Now you don't have to.

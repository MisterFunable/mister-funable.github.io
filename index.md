<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Live Airtable Embedded View" />
    <title>My Airtable Display</title>
    <!-- Tailwind CSS CDN (optional, for nice layout) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        background-color: #f9fafb;
      }
    </style>
  </head>
  <body class="flex flex-col items-center justify-center min-h-screen bg-gray-50">

    <header class="w-full text-center py-6 bg-white shadow-md">
      <h1 class="text-2xl font-bold text-gray-800">📋 My Airtable Dashboard</h1>
      <p class="text-gray-500">Powered by Airtable and GitHub Pages</p>
    </header>

    <main class="w-full flex-grow flex items-center justify-center p-4">
      <iframe
        class="w-full max-w-6xl rounded-lg shadow-lg"
        src="https://airtable.com/embed/app1visErgGQUtgGR/shrCxbWjNFLjg3zqO"
        frameborder="0"
        width="100%"
        height="800"
        style="background: transparent; border: 1px solid #ccc;"
      ></iframe>
    </main>

    <footer class="w-full text-center py-4 text-sm text-gray-400">
      &copy; 2025 Your Name or Project Name
    </footer>

  </body>
</html>

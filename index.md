<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>Full Airtable Page</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      html, body {
        height: 100%;
        margin: 0;
        overflow-x: hidden;
      }
      .responsive-iframe-container {
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100vh;
      }
    </style>
  </head>
  <body class="bg-gray-50">
    <div class="responsive-iframe-container">
      <iframe
        class="w-full h-full absolute top-0 left-0"
        src="https://airtable.com/embed/app1visErgGQUtgGR/shrCxbWjNFLjg3zqO"
        style="border: 0; background: transparent;"
      ></iframe>
    </div>
  </body>
</html>

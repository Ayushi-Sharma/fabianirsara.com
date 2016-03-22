<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?php echo $title; ?></title>
    <meta name="keywords" content="<?php echo $keywords; ?>">
    <meta name="description" content="<?php echo $description; ?>">

    <link rel="stylesheet" type="text/css" href="/assets/public/fonts/geomanist/font.css">
    <link id="stylesheet" rel="stylesheet" type="text/css" href="/build.css">

    <link rel="icon" href="/assets/public/favicon.png" type="image/x-icon">
    <link rel="shortcut icon" href="/assets/public/favicon.png" type="image/x-icon">
    <style type="text/css"><?php echo $style; ?></style>
  </head>
  <body>
    <div id="root"><?php echo $html; ?></div>
    <script src="/vendor.js"></script>
    <script src="/build.js"></script>
  </body>
</html>

<?php

define('DOC_ROOT', __DIR__.'/');

require DOC_ROOT.'vendor/autoload.php';
require DOC_ROOT.'bootstrap.php';
require DOC_ROOT.'routes.php';
$app->run();

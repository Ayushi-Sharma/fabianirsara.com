<?php
header('Access-Control-Allow-Origin: *');
date_default_timezone_set('Europe/Berlin');

$db = new App\DB();

if ($db->get() === NULL)
{
  $db->sync();
}

$container = new Slim\Container();

$container['notFoundHandler'] = function($container)
{
  return function($request, $response) use ($container)
  {
    return $container['response']
      ->withStatus(404)
      ->withHeader('Content-Type', 'application/json')
      ->write('{"error": true, "message": "Path not found"}');
  };
};

$app = new Slim\App($container);

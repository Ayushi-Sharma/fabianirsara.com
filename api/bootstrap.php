<?php
header('Access-Control-Allow-Origin: *');

$db = new App\DB();
$db->sync();

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

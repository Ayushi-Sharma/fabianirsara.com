<?php

$app->get('/images/{size}[/{file}]', function($request, $response, $args)
{
  return (new App\Images($request, $response, $args))->getAction();
});

$app->get('/data', function($request, $response, $args)
{
  return (new App\Data($request, $response, $args))->getAction();
});

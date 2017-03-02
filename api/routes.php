<?php

$app->get('/images/{size}[/{file}]', function($request, $response, $args)
{
  return (new App\Images($request, $response, $args))->generateAction();
});

$app->get('/'.(App\Config::get('cache')).'/{file}', function($request, $response, $args)
{
  return (new App\Images($request, $response, $args))->fetchAction();
});

$app->get('/data', function($request, $response, $args)
{
  return (new App\Data($request, $response, $args))->getAction();
});

$app->get('/sync', function($request, $response, $args)
{
  return App\DB::instance()->sync();
});

$app->get('/sync/force', function($request, $response, $args)
{
  App\FS::rimraf(DOC_ROOT.App\Config::get('storage').'/pages');
  return App\DB::instance()->sync(true);
});

$app->get('/bust', function($request, $response, $args)
{
  @unlink(DOC_ROOT.App\Config::get('storage').'/data.json');
  return App\FS::rimraf(DOC_ROOT.App\Config::get('cache'));
});

$app->post('/cachePage', function($request, $response, $args)
{
  return (new App\Data($request, $response, $args))->cacheAction();
});

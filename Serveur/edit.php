<?php 

if ($_SERVER['REQUEST_METHOD'] !== 'PUT') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}

$inputJSON = file_get_contents('php://input'); // récupération du corps de la requete HTTP
$champion = json_decode($inputJSON, TRUE);
$file_name = "data.json";
$champions = [];
if (file_exists($file_name)) {
    // chargement de la liste des champions depuis le fichier
    $champions = json_decode(file_get_contents($file_name), true);
}
$index = 0;
foreach($champions as $key => $value){
    if($champion["id"] == $value["id"]){
        foreach ($champion as $key2 => $value2){
            if($value !== $value["id"]){
                $champions[$key][$key2] = $champion[$key2];
            }
        }
    }
    $index++;
}
file_put_contents($file_name, json_encode($champions));




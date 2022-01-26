<?php
// ! = on vérifie si on utlise le bon protocole pour la requete
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
// récupération du corps de la requete HTTP
$inputJSON = file_get_contents('php://input');
$champion = json_decode($inputJSON, TRUE);
// Vérifier la validité du champion et l'ajouter:
// === Dans un fichier ===
$file_name = "data.json";
$data = [];
if (file_exists($file_name)) {
    $data = json_decode(file_get_contents($file_name), true);
}
$index = 0;
foreach($data as $key => $value){
    if($champion["id"] == $value["id"]){
        array_splice($data,$index,1);
    }
    $index++;
}
// Mise à jour du fichier
file_put_contents($file_name, json_encode($data));
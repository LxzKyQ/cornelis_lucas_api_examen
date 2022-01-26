<?php 
// ! = on vérifie si on utlise le bon protocole pour la requete
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
header("Content-Type: application/json; charset=utf-8");
// Vérifier la validité du champion et l'ajouter:
// === Dans un fichier ===
$file_name = "data.json";
$champions = [];
if(file_exists($file_name)){
    $champions = json_decode(file_get_contents($file_name),true);
}
// encodage du fichier en json et affichage de l'api
$json_text = json_encode($champions,JSON_PRETTY_PRINT);
echo $json_text;

?>
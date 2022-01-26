<?php
// ! = =
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header($_SERVER["SERVER_PROTOCOL"] . " 405 Method Not Allowed", true, 405);
    exit;
}
$inputJSON = file_get_contents('php://input'); // récupération du corps de la requete HTTP
$champion = json_decode($inputJSON, TRUE);
// Vérifier la validité du champion et l'ajouter:
// En BDD -> C'est ce qu'il faut faire dans un vrai projet
// === Dans un fichier ===
$file_name = "data.json";
$champions = [];
if (file_exists($file_name)) {
    // chargement de la liste des champions depuis le fichier
    $champions = json_decode(file_get_contents($file_name), true);
}
if(empty($champions)){
    $id =1;
}else{
    $id =0;
    foreach ($champions as $key => $value) {
        if($value['id']>=$id){
            $id = $value['id']+1;
        }
    }
}
$champion['id'] = $id;
array_push($champions, $champion);
// Mise à jour du fichier
file_put_contents($file_name, json_encode($champions));
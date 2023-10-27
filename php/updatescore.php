<?php
$name = $_POST['playername'];
$score = $_POST['playerscore'];

$path ="../xml/gamescore.xml";
// load the document


$gamescore = simplexml_load_file($path);

// update
$gamescore->name = $name;
$gamescore->score = $score;

// save the updated document
$gamescore->asXML($path);
echo "<script>window.close();</script>";
?>  
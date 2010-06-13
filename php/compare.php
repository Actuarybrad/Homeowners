<?php	
$db = new PDO('sqlite:../db/ho3.db3');
$dir = $_GET['dir'];
$sort = $_GET['sort'];
$name1 = $_GET['city'];
$name2 = $_GET['struct'];
$name3 = $_GET['ded'];
$name4 = $_GET['cov'];
$name5 = $_GET['dist'];
$name6 = $_GET['year'];
$did = $db->query("select ho3.company, home.grpname, ho3.premium, home.cr08, home.cr07, home.cr06, home.cr05, home.cr04, home.short, home.phone, home.web, home.ambest, home.ms08 from ho3, home where ho3.city='$name1' AND ho3.structure='$name2' AND ho3.deductible='$name3' AND ho3.coverage='$name4' AND ho3.distance='$name5' AND ho3.year='$name6' AND ho3.company=home.company ORDER BY $sort $dir");
while($obj = $did->fetch(PDO::FETCH_OBJ))
{
	$arr[] = $obj;
}
echo '{"results":'.json_encode($arr).'}';
?>
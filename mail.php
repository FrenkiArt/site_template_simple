<?php
/* echo '<pre>';
echo print_r($_POST);
echo '</pre>'; */

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  //обрабатываем полученные переменные.
  foreach ($_POST as $key => $value) {
    $value = trim($value); // убираем пробелы в начале и в конце переменной.
    $value = strip_tags($value);  // убираем теги
    if (get_magic_quotes_gpc()) $value = stripslashes($value); //убираем слеши, если надо
    $value = htmlspecialchars($value, ENT_QUOTES); //заменяем служебные символы HTML на эквиваленты
    $value = str_replace("\r", "", $value); // заменяем все переводы строк
    $value = str_replace("\n", "<br>", $value); //на <br>
    $_POST[$key] = $value; //и присваиваем новые значения элементам массива _POST[$key].
  }
}

$check = $_POST['check'];
$project_name = $_POST['project_name'];
$send_target = $_POST['send_target'];
$form_subject = $_POST['form_subject'];
$added_info = $_POST['added_info'];
$client_name = $_POST['client_name'];
$client_phone = $_POST['client_phone'];
$client_email = $_POST['client_email'];
$client_question = $_POST['client_question'];
$httpReferer = $_SERVER['HTTP_REFERER'];
$agree = $_POST['agree'];
$mail_for_send = $_POST['mail_for_send'];

//$adminEmail = 'frenki_art2@mail.ru';
$adminEmail = $_POST['mail_for_send'];
$adminSubject = $form_subject;

if ($send_target == 'call_me') {
  $adminMailText = "
    <h3>" . $_SERVER['HTTP_HOST'] . "</h3>
    <h2>
        Данные клиента:
    </h2>
    ";

  $adminMailText .= "
    <p>
    " . $_POST['project_name'] . "
    </p>
    <p>
        Имя: " . $_POST['client_name'] . "; <br>
        Телефон: " . $_POST['client_phone'] . "; <br>
        Тема: " . $_POST['form_subject'] . "; <br>
    </p>
    ";
}

// Always set content-type when sending HTML email
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
// More headers
//$headers .= 'From: <artywork@artywork.ru>' . "\r\n";
//$headers .= 'Cc: <copyMessage@mail.com>' . "\r\n";

$userSubject = 'Ваша заявка успешно получена';
$userEmail = $_POST['client_email'];
$userMailText = '<h2>Спасибо за заявку, скоро мы свяжемся с вами</h2>';

if ($check == 'kod') {
  //mail($adminEmail, $adminSubject, $adminMailText, $headers);
  //mail($userEmail, $userSubject, $userMailText, $headers);
  if (!mail($adminEmail, $adminSubject, $adminMailText, $headers)) {
    echo 'not send mail';
  } else {
    echo 'mail sended';
  }
} else {
  echo 'Spamer';
}

//header('Location: ./order-success.php');

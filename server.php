<?php
$message = $_POST['message'];

$apiKey = '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';
$url = 'https://api.openai.com/v1/chat/completions';

$headers = array(
    'Content-Type: application/json',
    'Authorization: Bearer ' . $apiKey
);

$data = array(
    'messages' => array(
        array('role' => 'system', 'content' => 'You are a user'),
        array('role' => 'user', 'content' => $message)
    )
);

$options = array(
    'http' => array(
        'header'  => $headers,
        'method'  => 'POST',
        'content' => json_encode($data)
    )
);

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);
$response = json_decode($result, true);

$botResponse = '';

if (isset($response['choices'][0]['message']['content'])) {
    $botResponse = $response['choices'][0]['message']['content'];
}

echo $botResponse;
?>

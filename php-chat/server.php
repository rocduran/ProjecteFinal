<?php
// Treiem el time out
set_time_limit(0);

// Include del script del server phpWebsocket (el servidor es iniciat mes tard)
require 'class.PHPWebSocket.php';

// Quan un clientenvia un missatge al servidor
function wsOnMessage($clientID, $message, $messageLength, $binary) {
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	// Mirem que la llargada del missatge no sigui = 0
	if ($messageLength == 0) {
		$Server->wsClose($clientID);
		return;
	}

	//El client que envia el missatge esta sol a la sala...Li direm algo, que no es senti sol ;)
	if ( sizeof($Server->wsClients) == 1 )
		$Server->wsSend($clientID, "No hi ha ningú conectat al servidor, però jo t'escolto igualment. --Jarvis");
	else
		//Envia el missatge a tothom que estigui conectat exceptuant el que ha enviat el missatge
		foreach ( $Server->wsClients as $id => $client )
			if ( $id != $clientID )
				$Server->wsSend($id, "$clientID ($ip) diu \"$message\"");
}

// Quan un client es conecta a la sala
function wsOnOpen($clientID)
{
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	$Server->log( "$ip ($clientID) s'ha conectat." );

	//Envia un missatge a tothom per anunciar l'arribada d'aquesta persona
	foreach ( $Server->wsClients as $id => $client )
		if ( $id != $clientID )
			$Server->wsSend($id, "El visitant $clientID ($ip) s'ha unit a la sala.");
}

// Quan un client perd o tanca la conexió
function wsOnClose($clientID, $status) {
	global $Server;
	$ip = long2ip( $Server->wsClients[$clientID][6] );

	$Server->log( "$ip ($clientID) s'ha desconectat." );

	//Envia un missatge avisant de que ha marxat la persona
	foreach ( $Server->wsClients as $id => $client )
		$Server->wsSend($id, "El visitant $clientID ($ip) ha marxat de la sala.");
}

// Fem start del server websocket
$Server = new PHPWebSocket();
$Server->bind('message', 'wsOnMessage');
$Server->bind('open', 'wsOnOpen');
$Server->bind('close', 'wsOnClose');
// for other computers to connect, you will probably need to change this to your LAN IP or external IP,
// alternatively use: gethostbyaddr(gethostbyname($_SERVER['SERVER_NAME']))
$Server->wsStartServer('127.0.0.1', 9300);

?>
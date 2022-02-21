const area = document.querySelector('.area');
const statusGame = document.querySelector('.game-status');
const modalWindow = document.querySelector('.modal-window');
const statWindow = document.querySelector('.modal-window-stat')
const modalContent = document.querySelector('.content');
const statContent = document.querySelector('.stat-content');
const overlay = document.querySelector('.overlay');
const statOverlay = document.querySelector('.stat-overlay');
const newGameButton = document.querySelector('.new-game');
const closeStatButton = document.querySelector('.close-stat-btn')
const cells = document.querySelectorAll('.cell');
const restartButton = document.querySelector('.restart');
const statButton = document.querySelector('.history');
const statX = document.querySelector('.score-x');
const statO = document.querySelector('.score-o');
const scoreTen = document.querySelector('.score-top')
const statDraw = document.querySelector('.draw');
const array = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
let move = 0;
let winner = '';
let currentPlayer = 'X';
let storageResults = [];
const currentTurn = () => `It's ${currentPlayer}'s turn`
statusGame.innerHTML = currentTurn();
let scoreX = 0;
let scoreO = 0;
let scoreDraw = 0;


// ===============================



function cellClick() {
	if (!this.textContent) {
		this.innerHTML = currentPlayer;
		changePlayer();
		move++;
		winCheck();
		drawCheck();
	}
}

function changePlayer() {
	currentPlayer === 'X' ? (currentPlayer = 'O') : (currentPlayer = 'X');
	statusGame.innerHTML = `It's ${currentPlayer}'s turn`;
}

function winCheck() {
		for (i = 0; array.length > i; i++) {
			if (
				cells[array[i][0]].innerHTML == 'X' && cells[array[i][1]].innerHTML == 'X' && cells[array[i][2]].innerHTML == 'X'
			) {
				winner = 'X';
				gameResult(winner);	
				let newScoreX = localStorage.getItem('scoreX')
				newScoreX++
				localStorage.setItem('scoreX', newScoreX)
				let result = {
					winnerIs: winner,
					moves: move
				}
				localStorage.setItem('res', JSON.stringify(result))
			} else if (
				cells[array[i][0]].innerHTML == 'O' && cells[array[i][1]].innerHTML == 'O' && cells[array[i][2]].innerHTML == 'O'
			) {
				winner = 'O';
				gameResult(winner);
				let newScoreO = localStorage.getItem('scoreO')
				newScoreO++
				localStorage.setItem('scoreO', newScoreO)
				let result = {
					winnerIs: winner,
					moves: move
				}
				localStorage.setItem('res', JSON.stringify(result))
			} 
		}
	}

function drawCheck() {
		if ((move === 9) && (statusGame.innerHTML !== ``)) {
			scoreDraw++;
			modalContent.innerHTML = `DRAW! by ${move} steps`;
			modalWindow.classList.add('active');
			statusGame.innerHTML = ``;
			let newScoreDraw = localStorage.getItem('Draw')
				newScoreDraw++
				localStorage.setItem('Draw', newScoreDraw)
				let result = {
					winnerIs: 'Draw',
					moves: move
				}
				localStorage.setItem('res', JSON.stringify(result))
		}
}

	function gameResult(winner) {
		modalContent.innerHTML = `${winner} win by ${move} steps`;
		modalWindow.classList.add('active');
		statusGame.innerHTML = ``;
	}
	
	function closeModalWindow() {
		modalWindow.classList.remove('active');
		restartGame()
		setLocal()
		lastTenResults();

	}

	function setLocal() {
		let prevRes = JSON.parse(localStorage.getItem('res'))
		let prevArray = JSON.parse(localStorage.getItem('array'))
		storageResults.unshift(prevRes);
		localStorage.setItem('array', JSON.stringify(storageResults))
	}


	function lastTenResults() {
		scoreTen.innerHTML = `1.Winner - ${storageResults[0]['winnerIs']} by ${storageResults[0]['moves']} steps     
		2.Winner - ${storageResults[1]['winnerIs']} by ${storageResults[1]['moves']} steps     
		3.Winner - ${storageResults[2]['winnerIs']} by ${storageResults[2]['moves']} steps     
		4.Winner - ${storageResults[3]['winnerIs']} by ${storageResults[3]['moves']} steps     
		5.Winner - ${storageResults[4]['winnerIs']} by ${storageResults[4]['moves']} steps     
		6.Winner - ${storageResults[5]['winnerIs']} by ${storageResults[5]['moves']} steps     
		7.Winner - ${storageResults[6]['winnerIs']} by ${storageResults[6]['moves']} steps     
		8.Winner - ${storageResults[7]['winnerIs']} by ${storageResults[7]['moves']} steps     
		9.Winner - ${storageResults[8]['winnerIs']} by ${storageResults[8]['moves']} steps     
		10.Winner - ${storageResults[9]['winnerIs']} by ${storageResults[9]['moves']} steps`     
		let lastTenResults = scoreTen.innerHTML;
		localStorage.setItem('lastTenResults', JSON.stringify(lastTenResults))
		console.log(lastTenResults)
	}

	function restartGame() {
		currentPlayer = 'X';
		statusGame.innerHTML = `It's ${currentPlayer}'s turn`;
		cells.forEach(element => element.innerHTML = '');
		move = 0;
	}

	function statOpen() {
		statWindow.classList.add('active');
		statX.innerHTML = `X wins ${localStorage.getItem('scoreX')} times`;
		statO.innerHTML = `O wins ${localStorage.getItem('scoreO')} times`;
		statDraw.innerHTML = `Draw ${localStorage.getItem('Draw')} times`;
		scoreTen.innerHTML = JSON.parse(localStorage.getItem('lastTenResults'));
	}

	function statClose() {
		statWindow.classList.remove('active');
	}
	
	cells.forEach(cell => cell.addEventListener('click', cellClick));
	restartButton.addEventListener('click', restartGame)
	newGameButton.addEventListener('click', closeModalWindow);
	statButton.addEventListener('click', statOpen);
	closeStatButton.addEventListener('click', statClose)
	window.addEventListener('beforeunload', () => localStorage.setItem('array', JSON.stringify(storageResults)))
	window.addEventListener('load', () => {
		if(localStorage.getItem('array')) {
			const prevArrayLoad =  JSON.parse(localStorage.getItem('array'))
			storageResults = prevArrayLoad.slice(0,10);
		}
	}
	)

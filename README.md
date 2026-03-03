# Tic Tac Toe

A browser-based Tic Tac Toe game built as part of the curriculum for [The Odin Project](https://www.theodinproject.com/). This project emphasizes the use of modular JavaScript, specifically focusing on the **Module Pattern** and **Factory Functions** to maintain a clean global scope and ensure strong data encapsulation.

## Technical Implementation & Logic

As a project focused on software architecture, the codebase avoids global variables by grouping related logic into localized scopes. 

### Design Patterns
* **IIFE (Immediately Invoked Function Expression):** Used to create singleton objects (`gameBoard`, `displayMaster`, `gameMaster`). An IIFE is a JavaScript function that runs as soon as it is defined. This creates a closure that encapsulates the internal state (like the game board array), preventing unwanted external mutations—similar to `private` access modifiers in C++ or Java.
* **Factory Functions:** Used to instantiate multiple `Player` objects. Factory functions leverage closures to grant access to the player's name and number via getter methods (`getName()`, `getNumber()`).

### The Math & State Logic
The game board is represented mathematically as a $3 \times 3$ matrix (a 2D array). 
* **Time Complexity:** The board evaluation algorithm (`checkBoard`) checks for terminal game states (a win). Because the maximum bounds of a Tic Tac Toe grid are fixed at $N = 3$, checking the 8 possible winning vectors (3 rows, 3 columns, 2 diagonals) runs in $O(1)$ constant time. 
* **Coordinate Mapping:** The visual DOM grid corresponds to the 2D array using strictly mapped datasets (`data-row` and `data-column`). User inputs are transformed into $0$-indexed coordinates to interact with the JavaScript array logic.

### UI & DOM Interaction
* **Event Delegation:** Instead of attaching event listeners to all 9 individual grid cells, a single listener is attached to the parent `.board` container. The event object (`e.target`) is used to identify the specific cell clicked, optimizing memory usage.
* **HTML Dialog Elements:** The project utilizes the native `<dialog>` HTML tag for requesting player input names dynamically. 

## Built With

* **HTML5:** Semantic markup, featuring native `<dialog>` tags.
* **CSS3:** Uses **CSS Grid** to construct a consistent $3 \times 3$ layout layout for the game board `display: grid; grid-template-columns: repeat(3, 1fr)`.
* **JavaScript (Vanilla ES6):** Implementations of closures, modules, factories, IIFE, and event delegation. 

## Features

* Allows two players to input their custom names via a modal pop-up before starting the game.
* Alternates turns sequentially between Player X and Player O.
* Features edge-case detection to prevent rewriting positions that are already marked.
* Automatically detects when a player wins by evaluating row, column, and diagonal matches across a $3 \times 3$ matrix.
* Provides buttons to **Play Again** (clears board state, keeps names) or **Reset Game** (reloads window for new players).

## 💡 How to Play

1. Open `index.html` in your web browser.
2. Enter a name for Player 1 (Plays as X) and Player 2 (Plays as O) when prompted by the dialog window.
3. Click "Start".
4. Take turns clicking on the grid squares to place your respective mark.
5. The first player to align three marks horizontally, vertically, or diagonally wins!

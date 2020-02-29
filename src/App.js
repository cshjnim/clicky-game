//import reacts
import React, { Component } from "react";
import NavTabs from "./components/NavTabs";
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import matches from "./matchcards.json";
import "./App.css";

//set some lets 
let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click & Click! If you click on the same one twice and you lose :(";

class App extends Component {

    // Setting this.state.matches to the matches json array
    state = {
        matches,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        // Make a copy of the state matches array to work with
        const matches = this.state.matches;

        // Filter for the clicked match
        const clickedMatch = matches.filter(match => match.id === id);

        // If the matched image's clicked value is already true, 
        // do the game over actions
        if (clickedMatch[0].clicked) {

            console.log("Correct Guesses: " + correctGuesses);
            console.log("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "ZEEZ! Start New Game."

            for (let i = 0; i < matches.length; i++) {
                matches[i].clicked = false;
            }

            this.setState({ clickMessage });
            this.setState({ correctGuesses });
            this.setState({ matches });

            // Otherwise, if clicked = false, and the user hasn't finished
        } else if (correctGuesses < 11) {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // increment the appropriate counter
            correctGuesses++;

            clickMessage = "Great! New Player! Keep going!";

            if (correctGuesses > bestScore) {
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function (a, b) { return 0.5 - Math.random() });

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({ correctGuesses });
            this.setState({ clickMessage });
        } else {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // restart the guess counter
            correctGuesses = 0;

            // Egg on the user to play again
            clickMessage = "WOW!!! You got ALL of them!!! Now, let's see if you can do it again!";
            bestScore = 12;
            this.setState({ bestScore });

            for (let i = 0; i < matches.length; i++) {
                matches[i].clicked = false;
            }

            // Shuffle the array to be rendered in a random order
            matches.sort(function (a, b) { return 0.5 - Math.random() });

            // Set this.state.matches equal to the new matches array
            this.setState({ matches });
            this.setState({ correctGuesses });
            this.setState({ clickMessage });

        }
    };

    render() {
        return (

            <Wrapper>
                <NavTabs />
                <Title>Clicky Game of Game Players</Title>
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>

                <h3 className="scoreSummary card-header">
                    Correct Guesses: {this.state.correctGuesses}
                    <br />
                    Best Score: {this.state.bestScore}
                </h3>
                <div className="container">
                    <div className="row">
                        {this.state.matches.map(match => (
                            <MatchCard
                                setClicked={this.setClicked}
                                id={match.id}
                                key={match.id}
                                image={match.image}
                            />
                        ))}
                    </div>
                </div>

            </Wrapper>
        );
    }
}

export default App;
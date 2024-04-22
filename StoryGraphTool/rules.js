class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); // TODO: replace this text using this.engine.storyData to find the story title
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); // TODO: replace this text by the initial location of the story
    }
}

let cKey_found = false;

let button_pressed = false;

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; // TODO: use `key` to get the data object for the current story location
        this.engine.show(locationData.Body); // TODO: replace this text by the Body of the location data
        
        if(locationData.Choices) { // TODO: check if the location has any Choices
            for(let choice of locationData.Choices) { // TODO: loop over the location's Choices
                this.engine.addChoice(choice.Text, choice); // TODO: use the Text of the choice
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
            let secret = locationData.secret;
            switch(key) {
                case "forest":
                    if(cKey_found) {this.engine.addChoice(secret.Text, secret)}
                    break;
                case "secret_cellar":
                    if(button_pressed) {this.engine.addChoice(secret.Text, secret)}
                    break;
                default:
                    break;
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if(choice) {
            switch(choice.Target) {
                case "treasure_unlocked":
                    cKey_found = true;
                    break;  
                case "opening":
                    button_pressed = true;
                default:
                    break;                        
            }
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

/*class CKey extends Scene{
    create(key){
        let locationData = this.engine.storyData.Locations[key];
        let cKey = locationData.cKey;
        let buttonPressed = locationData.buttonPressed;
        switch(key){
            case "forest":
                if(cKey_found){this.engine.addChoice(cKey.Text, cKey)}
                break;
            case"secret_cellar":
                if(button_pressed){this.engine.addChoice(buttonPressed.Text, buttonPressed)}
                break;
            default:
                break;
        }
    } 
    handleChoice(choice) {
        if(choice){
            switch(choice.Target){
                case"treasure_unlocked":
                    cKey_found = true;  
                case"cave":
                    button_pressed = true;
                    break;
                default:
                    break;                        
            }
        } else {
            this.engine.gotoScene(End);
        }
    }
}
*/
class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');
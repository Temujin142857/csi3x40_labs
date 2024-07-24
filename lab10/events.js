document.addEventListener("DOMContentLoaded", function() {
    var Scene = window.Scene; // Ensure Scene is accessible globally

    function keydown(event) {
        switch (event.keyCode) {
            case 39: // Right arrow
                Scene.playerDirection = "right";
                break;
            case 37: // Left arrow
                Scene.playerDirection = "left";
                break;
            default:
                Scene.playerDirection = null;
                break;
        }
    }

    function keyup(event) {
        Scene.playerDirection = null;
    }

    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);
});
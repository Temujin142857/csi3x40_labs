var Scene = (function() {
    var entity = {
        styles: {
            grass: "#2ecc71",
            sky: "#3498db",
            trunk: "#A17917",
            leaves: "#27ae60",
            healthBarBackground: "#e74c3c",
            healthBarFill: "#2ecc71"
        },
        player: 10,
        playerDirection: null,
        playerJumping: false,
        jumpPercent: 0,
        position: -1,
        trees: [100, 500, 800, 1000, 1200],
        playerWidth: 15,
        treeWidth: 12,
        health: 100, // Player health
        maxHealth: 100 // Maximum health
    };

    function fullScreenProperties() {
        var ratio = 0.8;
        return {
            x: window.innerWidth * ratio,
            y: window.innerHeight * ratio
        };
    }

    function drawGrass() {
        entity.context.fillStyle = entity.styles.grass;
        entity.context.fillRect(0, entity.y * 0.9, entity.x, entity.y * 0.1);
    }

    function drawSky() {
        entity.context.fillStyle = entity.styles.sky;
        entity.context.fillRect(0, 0, entity.x, entity.y * 0.9);
    }

    function drawTree(x) {
        var y = entity.y * 0.9;
        var context = entity.context;
        context.beginPath();
        context.moveTo(x, y);
        context.fillStyle = entity.styles.trunk;
        context.lineTo(x + 4, y - 20);
        context.lineTo(x + 8, y - 20);
        context.lineTo(x + 12, y);
        context.closePath();
        context.fill();
        context.beginPath();
        context.arc(x + 6, y - 25, 10, 0, Math.PI * 2);
        context.fillStyle = entity.styles.leaves;
        context.fill();
    }

    function drawHealthBar() {
        var x = 10;
        var y = 10;
        var width = 100;
        var height = 10;

        // Draw the background of the health bar
        entity.context.fillStyle = entity.styles.healthBarBackground;
        entity.context.fillRect(x, y, width, height);

        // Draw the filled part of the health bar
        var healthWidth = (entity.health / entity.maxHealth) * width;
        entity.context.fillStyle = entity.styles.healthBarFill;
        entity.context.fillRect(x, y, healthWidth, height);
    }

    function drawPlayer() {
        var y = entity.y * 0.9;
        var jumpOffset = 0;
        if (entity.jumpPercent > 0) {
            switch (Math.ceil(entity.jumpPercent / 25)) {
                case 4:
                case 1:
                case 0:
                    jumpOffset = 30;
                    break;
                case 2:
                case 3:
                    jumpOffset = 40;
                    break;
            }
            entity.jumpPercent -= 1;
        }
        entity.context.fillStyle = "#f1c40f";
        entity.context.fillRect(entity.player, y - 25 - jumpOffset, entity.playerWidth, 25 + jumpOffset);

        // Draw the health bar
        drawHealthBar();
    }

    function blowUp() {
        drawPlayer();
        entity.health -= 10; // Example of decreasing health
        if (entity.health <= 0) {
            // Handle player death or game over
            console.log("Game Over!");
        }
    }

    function checkCollisions() {
        var playerMin = entity.player;
        var playerMax = playerMin + entity.playerWidth;
        for (var i in entity.trees) {
            var treeMin = entity.trees[i];
            var treeMax = treeMin + entity.treeWidth;
            if (playerMax >= treeMin && playerMin <= treeMax) {
                if (entity.jumpPercent >= 75 || entity.jumpPercent <= 25) {
                    blowUp();
                }
            }
        }
    }



    function tick() {
        drawSky();
        entity.position += 1;
        for (var i in entity.trees) {
            var treeOffset = entity.trees[i] - entity.position;
            if (treeOffset >= 0 && treeOffset <= entity.x) {
                drawTree(treeOffset);
            }
        }
        drawPlayer();
        checkCollisions();
    }

    entity.init = function(drawpad) {
        var dim = fullScreenProperties();
        entity.drawpad = drawpad;
        entity.context = drawpad.getContext("2d");
        entity.x = dim.x;
        entity.y = dim.y;
        entity.drawpad.width = dim.x;
        entity.drawpad.height = dim.y;
        drawGrass();
        drawSky();
        setInterval(tick, 10);
    }

    return entity;
}());

window.addEventListener("load", function() {
    var drawpad = document.getElementById("drawpad");
    Scene.init(drawpad);
}, false);

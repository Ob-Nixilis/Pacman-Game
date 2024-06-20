class Pacman {
    constructor(x, y,widht, height, speed) {
        this.x = x;
        this.y = y;
        this.widht = widht;
        this.height = height;
        this.speed = speed;
        this.direction = DIRECTION_RIGHT;
        this.nextDirection = this.direction;
        this.currentFrame = 1;
        this.frameCount = 7; // Number of frames in the "animations.gif"

        setInterval(() => {
            this.changeAnimation();
        }, 100); // Change the animation every 100ms
    }

    moveProcess() {
        this.changeDirectionIfPossible();
        this.moveForwards();
        if (this.checkCollision()) {
            this.moveBackwards();
        }
    }

    eat() {
        for(let i = 0; i < map.length; i++) {
            for(let j = 0; j < map[0].length; j++) {
                if (
                    map[i][j] == 2 &&
                    this.getMapX() == j &&
                    this.getMapY() == i
                ) {
                    map[i][j] = 3;
                    score++;
                }
            }
        }
    }

    moveBackwards() {
        switch (this.direction) {
            case DIRECTION_UP:
                this.y += this.speed;
                break;
            case DIRECTION_BOTTOM:
                this.y -= this.speed;
                break;
            case DIRECTION_RIGHT:
                this.x -= this.speed;
                break;
            case DIRECTION_LEFT:
                this.x += this.speed;
                break;
        }
    }

    moveForwards() {
        switch (this.direction) {
            case DIRECTION_UP:
                this.y -= this.speed;
                break;
            case DIRECTION_BOTTOM:
                this.y += this.speed;
                break;
            case DIRECTION_RIGHT:
                this.x += this.speed;
                break;
            case DIRECTION_LEFT:
                this.x -= this.speed;
                break;
        }
    }

    checkCollision() {
        let isCollided = false
        if (
            map [this.getMapY()][this.getMapX()] == 1 ||
            map [this.getMapYRightSide()][this.getMapX()] == 1 ||
            map [this.getMapY()][this.getMapXRightSide()] == 1 ||
            map [this.getMapYRightSide()][this.getMapXRightSide()] == 1
        ) {
            return true;
        }
        return false;
    }

    checkGhostCollision() {
        for(let i = 0; i < ghosts.length; i++) {
            let ghost = ghosts[i];
            // Check if the pacman is in the same position as the ghost
            if (
                ghost.getMapX() == this.getMapX() && 
                ghost.getMapY() == this.getMapY()
            ) {
                // Collision detected
                return true;
            }
        }
        return false;
    }

    changeDirectionIfPossible() {
        if(this.direction == this.nextDirection) return
        
        let tempDirection = this.direction;
        this.direction = this.nextDirection;
        this.moveForwards()
        if(this.checkCollision()) {
            this.moveBackwards();
            this.direction = tempDirection; 
            // If the new direction is not possible, keep the old direction
        }  else {
                this.moveBackwards();
        }
    }

    changeAnimation() {
        this.currentFrame = this.currentFrame == this.frameCount ? 1 : this.currentFrame + 1;
    }   

    draw() {
        canvasContext.save()
        canvasContext.translate(
            this.x + oneBlockSize / 2, 
            this.y + oneBlockSize / 2
        );
        canvasContext.rotate(this.direction * 90 * Math.PI / 180); // 90 is the angle in degrees for each direction

        canvasContext.translate(
            -this.x - oneBlockSize / 2, 
            -this.y - oneBlockSize / 2
        );

        canvasContext.drawImage(
            pacmanFrames,
            (this.currentFrame - 1) * oneBlockSize,
            0, 
            oneBlockSize, 
            oneBlockSize, 
            this.x, 
            this.y, 
            this.widht, 
            this.height
        );

        canvasContext.restore();
    }   

    getMapX() {
        return parseInt(this.x / oneBlockSize);
    }
    // Get the X and Y coordinates of the map
    getMapY() {
        return parseInt(this.y / oneBlockSize);
    }

    getMapXRightSide() {
        return parseInt((this.x + 0.9999 * oneBlockSize ) / oneBlockSize)
    }

    getMapYRightSide() {
        return parseInt((this.y + 0.9999 * oneBlockSize) / oneBlockSize)
    }
}

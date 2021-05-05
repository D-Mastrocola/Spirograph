class Pendulumn {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.armLength = parseFloat(document.getElementById('first-arm-length-slider').value);
        this.mass = 10;
        this.rotation = 0;
        this.paths = {
            first: [],
            second: []
        };
        this.secondLength = parseFloat(document.getElementById('second-arm-length-slider').value);
        this.secondMass = 5;
        this.secondRotation = 0;
        this.rotationSpeed = parseFloat(document.getElementById('first-arm-rotation-slider').value);
        this.secondRotationSpeed = parseFloat(document.getElementById('second-arm-rotation-slider').value);
    }
    changeValues() {
        this.paths = {
            first: [],
            second: []
        };
        let armOneLength = parseFloat(document.getElementById('first-arm-length-slider').value);
        let armTwoLength = parseFloat(document.getElementById('second-arm-length-slider').value);
        let armOneSpeed = parseFloat(document.getElementById('first-arm-rotation-slider').value);
        let armTwoSpeed = parseFloat(document.getElementById('second-arm-rotation-slider').value);
        this.armLength = armOneLength;
        this.secondLength = armTwoLength;
        this.rotationSpeed = armOneSpeed;
        this.secondRotationSpeed = armTwoSpeed;


        document.getElementById('arm-length-one-text').innerHTML = 'Arm Length 1:  ' + armOneLength;
        document.getElementById('arm-length-two-text').innerHTML = 'Arm Length 2:  ' + armTwoLength;
        document.getElementById('arm-rotation-one-text').innerHTML = 'Speed 1:  ' + armOneSpeed;
        document.getElementById('arm-rotation-two-text').innerHTML = 'Speed 2:  ' + armTwoSpeed;
    }
    update(GRAVITY) {
        
        this.rotation += this.rotationSpeed;
        console.log(typeof this.rotationSpeed)
        this.secondRotation += this.secondRotationSpeed;
        if(this.rotation > 360) this.rotation -= 360;
        if(this.secondRotation > 360) this.secondRotation -= 360;
    }
    getAngle(rotation) {
        return ((rotation/360) * Math.PI*2);
    }
    randomColor() {
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;

        return [r, g, b];
    }
    calculateRotation(ctx) {
            ctx.strokeStyle = '#0000ff';
            ctx.lineWidth = 4;

            let pendulumnCoords = {
                x: this.x + this.armLength * Math.sin(this.getAngle(this.rotation)),
                y: this.y + this.armLength * Math.cos(this.getAngle(this.rotation))
            }
            //First Pendulumn
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(pendulumnCoords.x, pendulumnCoords.y);
            ctx.stroke();
            
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(pendulumnCoords.x, pendulumnCoords.y, this.mass, 0, Math.PI * 2);
            ctx.fill();

            let secondPendulumnCoords = {
                x: pendulumnCoords.x + this.secondLength * Math.sin(this.getAngle(this.secondRotation)),
                y: pendulumnCoords.y + this.secondLength * Math.cos(this.getAngle(this.secondRotation))
            }
            //Second Pendulumn
            ctx.beginPath();
            ctx.moveTo(pendulumnCoords.x, pendulumnCoords.y);
            ctx.lineTo(secondPendulumnCoords.x, secondPendulumnCoords.y);
            ctx.stroke();
            
            ctx.fillStyle = '#000000';
            ctx.beginPath();
            ctx.arc(secondPendulumnCoords.x, secondPendulumnCoords.y, this.secondMass, 0, Math.PI * 2);
            ctx.fill();

            this.paths.first.push([pendulumnCoords.x, pendulumnCoords.y])
            this.paths.second.push([secondPendulumnCoords.x, secondPendulumnCoords.y])
    }
    draw(ctx) {
        this.calculateRotation(ctx);

        
        ctx.lineWidth = 1;
        let rgb = this.randomColor();
        ctx.strokeStyle = 'rgb(' + rgb[0] +',' + rgb[1] +',' + rgb[2] +')';
        ctx.strokeStyle ="#ff0000";
        ctx.beginPath();
        ctx.moveTo(this.paths.first[0][0], this.paths.first[0][1]);


        //Draw paths
        if(this.paths.first.length > 10000) {
            this.paths.first.shift();
            this.paths.second.shift();
        }
        for(let i = 1; i < this.paths.first.length; i++) {
            
            
            ctx.lineTo(this.paths.first[i][0], this.paths.first[i][1]);
        }
        ctx.stroke();
        

        ctx.beginPath();
        ctx.moveTo(this.paths.second[0][0], this.paths.second[0][1]);
        //Draw paths
        for(let i = 1; i < this.paths.second.length; i++) {
            ctx.lineTo(this.paths.second[i][0], this.paths.second[i][1]);
        }
        ctx.stroke();
    }
}
export default Pendulumn;
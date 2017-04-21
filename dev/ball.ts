class Ball {
    
    private game : Game;
        
    constructor(g:Game) {
        this.game = g;
        
        // physics object
        
    }
    
    
    private place():void {
        // this.div.style.left = "100px";
        // this.div.style.top = "100px";
        
        this.div.style.transform = "translate(100px,100px)";
    }
}
// 3D Rotating Cube Background Effect
// Creates a subtle animated cube in the background

class RotatingCube {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.angle = 0;
        this.vertices = [];
        this.edges = [];
        this.setupCube();
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.setupCanvas());
    }
    
    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '0';
        this.canvas.style.opacity = '0.3';
        this.canvas.style.pointerEvents = 'none';
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        if (!document.body.contains(this.canvas)) {
            document.body.insertBefore(this.canvas, document.body.firstChild);
        }
        
        console.log('✅ 3D Cube canvas initialized');
    }
    
    setupCube() {
        const size = Math.min(window.innerWidth, window.innerHeight) * 0.12; // Much smaller
        
        // Define cube vertices
        this.vertices = [
            [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
        ].map(v => v.map(coord => coord * size));
        
        // Define cube edges
        this.edges = [
            [0, 1], [1, 2], [2, 3], [3, 0], // Back face
            [4, 5], [5, 6], [6, 7], [7, 4], // Front face
            [0, 4], [1, 5], [2, 6], [3, 7]  // Connecting edges
        ];
    }
    
    rotatePoint(point, angleX, angleY, angleZ) {
        let [x, y, z] = point;
        
        // Rotate around X axis
        let cosX = Math.cos(angleX);
        let sinX = Math.sin(angleX);
        let y1 = y * cosX - z * sinX;
        let z1 = y * sinX + z * cosX;
        y = y1;
        z = z1;
        
        // Rotate around Y axis
        let cosY = Math.cos(angleY);
        let sinY = Math.sin(angleY);
        let x1 = x * cosY + z * sinY;
        z1 = -x * sinY + z * cosY;
        x = x1;
        z = z1;
        
        // Rotate around Z axis
        let cosZ = Math.cos(angleZ);
        let sinZ = Math.sin(angleZ);
        let x2 = x * cosZ - y * sinZ;
        let y2 = x * sinZ + y * cosZ;
        
        return [x2, y2, z1];
    }
    
    project(point) {
        const [x, y, z] = point;
        const scale = 400 / (400 + z);
        const x2d = x * scale + this.canvas.width / 2;
        const y2d = y * scale + this.canvas.height / 2;
        return [x2d, y2d, scale];
    }
    
    drawCube() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Rotate all vertices
        const rotatedVertices = this.vertices.map(v => 
            this.rotatePoint(v, this.angle * 0.5, this.angle, this.angle * 0.7)
        );
        
        // Project to 2D
        const projectedVertices = rotatedVertices.map(v => this.project(v));
        
        // Sort edges by depth for proper rendering
        const edgesWithDepth = this.edges.map(edge => {
            const [i1, i2] = edge;
            const avgZ = (rotatedVertices[i1][2] + rotatedVertices[i2][2]) / 2;
            return { edge, depth: avgZ };
        });
        
        edgesWithDepth.sort((a, b) => a.depth - b.depth);
        
        // Draw edges with gradient
        edgesWithDepth.forEach(({ edge, depth }) => {
            const [i1, i2] = edge;
            const [x1, y1, scale1] = projectedVertices[i1];
            const [x2, y2, scale2] = projectedVertices[i2];
            
            // Create gradient from ocean-blue to sky-teal
            const gradient = this.ctx.createLinearGradient(x1, y1, x2, y2);
            gradient.addColorStop(0, '#007bff'); // Ocean blue
            gradient.addColorStop(0.5, '#0099ff'); // Sapphire
            gradient.addColorStop(1, '#00d4ff'); // Sky teal
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = 6 * Math.min(scale1, scale2); // Thicker lines
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            
            this.ctx.beginPath();
            this.ctx.moveTo(x1, y1);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
        });
        
        // Draw vertices as glowing points
        projectedVertices.forEach(([x, y, scale]) => {
            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 8 * scale);
            gradient.addColorStop(0, 'rgba(0, 212, 255, 0.8)'); // Sky teal
            gradient.addColorStop(0.5, 'rgba(0, 123, 255, 0.4)'); // Ocean blue
            gradient.addColorStop(1, 'rgba(0, 123, 255, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 8 * scale, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    animate() {
        this.angle += 0.015; // Faster rotation
        this.drawCube();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the cube when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new RotatingCube());
} else {
    new RotatingCube();
}

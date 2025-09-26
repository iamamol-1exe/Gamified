import React, { useContext, useRef } from 'react';
import Phaser from 'phaser';
import PhaserGame from '../Components/PhaserGame'; // Your reusable component
import { updateMark } from '../utils/updateUserMarks';
import { AuthContext } from '../context/AuthContext';

// --- All of your game-specific code from the HTML file goes here ---

const REACTION_DATA = [
    { reactants: [{ formula: 'H₂', elements: { H: 2 } }, { formula: 'O₂', elements: { O: 2 } }], products: [{ formula: 'H₂O', elements: { H: 2, O: 1 } }], solution: [2, 1, 2], fact: 'This reaction forms water, the basis of all life on Earth!' },
    { reactants: [{ formula: 'CH₄', elements: { C: 1, H: 4 } }, { formula: 'O₂', elements: { O: 2 } }], products: [{ formula: 'CO₂', elements: { C: 1, O: 2 } }, { formula: 'H₂O', elements: { H: 2, O: 1 } }], solution: [1, 2, 1, 2], fact: 'This is the combustion of methane, the main component of natural gas.' },
    { reactants: [{ formula: 'N₂', elements: { N: 2 } }, { formula: 'H₂', elements: { H: 2 } }], products: [{ formula: 'NH₃', elements: { N: 1, H: 3 } }], solution: [1, 3, 2], fact: 'This is the Haber-Bosch process, crucial for making industrial fertilizer.' },
    { reactants: [{ formula: 'Na', elements: { Na: 1 } }, { formula: 'Cl₂', elements: { Cl: 2 } }], products: [{ formula: 'NaCl', elements: { Na: 1, Cl: 1 } }], solution: [2, 1, 2], fact: 'This reaction produces Sodium Chloride, commonly known as table salt.' }
];

const ELEMENT_COLORS = { 'H': 0xffffff, 'O': 0xff4d4d, 'C': 0x4B5563, 'N': 0x60A5FA, 'Na': 0xA78BFA, 'Cl': 0x4ADE80 };

class BalanceScene extends Phaser.Scene {
    constructor() {
        super('BalanceScene');
        this.currentReactionIndex = 0;
        this.userCoefficients = [];
        this.score = 0;
        this.updateMarksCallback = null;
    }
    // Paste the rest of your BalanceScene class methods here
    // (create, drawLayout, loadReaction, checkSolution, etc.)
    create() {
        this.cameras.main.setBackgroundColor('#2c3e50');
        this.drawLayout();
        this.createButtons();
        this.loadReaction(this.currentReactionIndex);
    }
    drawLayout() {
        this.add.text(500, 40, 'Reaction Balancer', { fontSize: '40px', color: '#ecf0f1', fontStyle: 'bold' }).setOrigin(0.5);
        this.scoreText = this.add.text(120, 50, 'Score: 0', { fontSize: '28px', color: '#ecf0f1', fontStyle: 'bold' }).setOrigin(0.5);
        const reactantZone = this.add.graphics({ lineStyle: { width: 3, color: 0x3498db, alpha: 0.6 } });
        reactantZone.strokeRoundedRect(50, 250, 430, 250, 15);
        this.add.text(265, 275, 'Reactants', { fontSize: '24px', color: '#3498db' }).setOrigin(0.5);
        const productZone = this.add.graphics({ lineStyle: { width: 3, color: 0xe67e22, alpha: 0.6 } });
        productZone.strokeRoundedRect(520, 250, 430, 250, 15);
        this.add.text(735, 275, 'Products', { fontSize: '24px', color: '#e67e22' }).setOrigin(0.5);
        this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.3 } }).fillRoundedRect(50, 520, 900, 110, 15);
        this.reactantCountsText = this.add.text(70, 535, '', { fontSize: '20px', color: '#fff', fontStyle: '500', lineHeight: '26px' });
        this.productCountsText = this.add.text(530, 535, '', { fontSize: '20px', color: '#fff', fontStyle: '500', lineHeight: '26px' });
    }
    createButtons() {
        const balanceBtn = this.add.text(500, 180, 'Balance!', { fontSize: '32px', color: '#ffffff', backgroundColor: '#27ae60', padding: { x: 25, y: 12 }, fontStyle: 'bold', borderRadius: 10 }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.addHoverEffect(balanceBtn);
        balanceBtn.on('pointerdown', () => this.checkSolution());
        const nextBtn = this.add.text(880, 50, 'Next →', { fontSize: '24px', color: '#ffffff', backgroundColor: '#2980b9', padding: { x: 18, y: 10 }, borderRadius: 8 }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        this.addHoverEffect(nextBtn);
        nextBtn.on('pointerdown', () => {
            this.currentReactionIndex = (this.currentReactionIndex + 1) % REACTION_DATA.length;
            this.loadReaction(this.currentReactionIndex);
        });
    }
    addHoverEffect(button) {
        button.on('pointerover', () => {
            this.tweens.add({ targets: button, scale: 1.05, duration: 200, ease: 'Power1' });
        });
        button.on('pointerout', () => {
            this.tweens.add({ targets: button, scale: 1, duration: 200, ease: 'Power1' });
        });
    }
    loadReaction(index) {
        if (this.equationObjects) {
            this.equationObjects.forEach(obj => obj.destroy());
        }
        this.equationObjects = [];
        const reaction = REACTION_DATA[index];
        this.userCoefficients = Array(reaction.reactants.length + reaction.products.length).fill(1);
        let currentX = 150;
        reaction.reactants.forEach((comp, i) => {
            this.createEquationComponent(currentX, 120, comp.formula, i);
            currentX += 120;
            if (i < reaction.reactants.length - 1) {
                const plus = this.add.text(currentX, 120, '+', { fontSize: '36px', color: '#ecf0f1' }).setOrigin(0.5);
                this.equationObjects.push(plus);
                currentX += 120;
            }
        });
        const arrow = this.add.text(500, 120, '→', { fontSize: '48px', color: '#ecf0f1' }).setOrigin(0.5);
        this.equationObjects.push(arrow);
        currentX = 650;
        reaction.products.forEach((comp, i) => {
            const globalIndex = reaction.reactants.length + i;
            this.createEquationComponent(currentX, 120, comp.formula, globalIndex);
            currentX += 120;
            if (i < reaction.products.length - 1) {
                const plus = this.add.text(currentX, 120, '+', { fontSize: '36px', color: '#ecf0f1' }).setOrigin(0.5);
                this.equationObjects.push(plus);
                currentX += 120;
            }
        });
        this.updateVisuals();
    }
    createEquationComponent(x, y, formula, index) {
        const coeffText = this.add.text(x - 60, y, this.userCoefficients[index], { fontSize: '36px', color: '#55efc4' }).setOrigin(0.5);
        const upArrow = this.add.text(x - 60, y - 35, '▲', { fontSize: '22px', color: '#fff' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        const downArrow = this.add.text(x - 60, y + 35, '▼', { fontSize: '22px', color: '#fff' }).setOrigin(0.5).setInteractive({ useHandCursor: true });
        upArrow.on('pointerdown', () => {
            this.userCoefficients[index] = Math.min(10, this.userCoefficients[index] + 1);
            coeffText.setText(this.userCoefficients[index]);
            this.updateVisuals();
        });
        downArrow.on('pointerdown', () => {
            if (this.userCoefficients[index] > 1) {
                this.userCoefficients[index]--;
                coeffText.setText(this.userCoefficients[index]);
                this.updateVisuals();
            }
        });
        const formulaText = this.add.text(x, y, formula, { fontSize: '36px', color: '#ecf0f1' }).setOrigin(0.5);
        this.equationObjects.push(coeffText, upArrow, downArrow, formulaText);
    }
    updateVisuals() {
        if (this.moleculeSprites) {
            this.moleculeSprites.forEach(sprite => sprite.destroy());
        }
        this.moleculeSprites = [];
        const reaction = REACTION_DATA[this.currentReactionIndex];
        const reactantCounts = {};
        const productCounts = {};
        reaction.reactants.forEach((comp, i) => {
            for (let n = 0; n < this.userCoefficients[i]; n++) {
                const molecule = this.drawMolecule(100 + (n * 90), 320, comp.elements);
                this.moleculeSprites.push(molecule);
            }
            for (const el in comp.elements) {
                reactantCounts[el] = (reactantCounts[el] || 0) + (comp.elements[el] * this.userCoefficients[i]);
            }
        });
        reaction.products.forEach((comp, i) => {
            const globalIndex = reaction.reactants.length + i;
            for (let n = 0; n < this.userCoefficients[globalIndex]; n++) {
                const molecule = this.drawMolecule(570 + (n * 90), 320, comp.elements);
                this.moleculeSprites.push(molecule);
            }
            for (const el in comp.elements) {
                productCounts[el] = (productCounts[el] || 0) + (comp.elements[el] * this.userCoefficients[globalIndex]);
            }
        });
        this.updateAtomCounts(reactantCounts, productCounts);
    }
    drawMolecule(x, y, elements) {
        const container = this.add.container(x, y);
        let atomX = 0;
        let atomCount = 0;
        for (const symbol in elements) {
            atomCount += elements[symbol];
        }
        let startX = -(atomCount - 1) * 12.5 / 2;
        for (const symbol in elements) {
            for (let i = 0; i < elements[symbol]; i++) {
                const circle = this.add.graphics({ fillStyle: { color: ELEMENT_COLORS[symbol] } });
                circle.fillCircle(startX, 0, 12);
                circle.lineStyle(2, 0x000, 0.3).strokeCircle(startX, 0, 12);
                const text = this.add.text(startX, 0, symbol, { fontSize: '14px', color: '#000', fontStyle: 'bold' }).setOrigin(0.5);
                container.add([circle, text]);
                startX += 25;
            }
        }
        return container;
    }
    updateAtomCounts(reactantCounts, productCounts) {
        let reactantStr = 'Reactant Atoms:\n';
        let productStr = 'Product Atoms:\n';
        const allElements = new Set([...Object.keys(reactantCounts), ...Object.keys(productCounts)]);
        let isFullyBalanced = true;
        allElements.forEach(el => {
            const rCount = reactantCounts[el] || 0;
            const pCount = productCounts[el] || 0;
            if (rCount !== pCount) isFullyBalanced = false;
            reactantStr += `${el}: ${rCount}\n`;
            productStr += `${el}: ${pCount}\n`;
        });
        const statusColor = isFullyBalanced ? '#2ecc71' : '#e74c3c';
        this.reactantCountsText.setColor(statusColor);
        this.productCountsText.setColor(statusColor);
        this.reactantCountsText.setText(reactantStr);
        this.productCountsText.setText(productStr);
    }
    checkSolution() {
        const reaction = REACTION_DATA[this.currentReactionIndex];
        const isCorrect = JSON.stringify(this.userCoefficients) === JSON.stringify(reaction.solution);
        const message = isCorrect ? `Correct! \n\n${reaction.fact}` : 'Not quite balanced. Try again!';
        const bgColor = isCorrect ? 0x27ae60 : 0xc0392b;
        
        console.log('checkSolution called:', { isCorrect, currentIndex: this.currentReactionIndex });
        
        if (isCorrect) {
            this.score += 10;
            // Call the update function passed from the React component
            if (this.updateMarksCallback) {
                this.updateMarksCallback(10); // Award 100 points for correct answer
            }
        } else {
            this.score = Math.max(0, this.score - 10);
        }
        
        this.scoreText.setText(`Score: ${this.score}`);
        const feedbackBox = this.add.graphics({ fillStyle: { color: bgColor, alpha: 0.9 } });
        feedbackBox.fillRoundedRect(250, 200, 500, 200, 15);
        const feedbackText = this.add.text(500, 300, message, { fontSize: '24px', color: '#fff', align: 'center', wordWrap: { width: 480 } }).setOrigin(0.5);
        
        // Auto-advance to next question if correct
        this.time.delayedCall(3000, () => {
            console.log('3 seconds passed, cleaning up feedback');
            feedbackBox.destroy();
            feedbackText.destroy();
            
            // If answer is correct, automatically load the next reaction
            if (isCorrect) {
                const nextIndex = (this.currentReactionIndex + 1) % REACTION_DATA.length;
                console.log('Auto-advancing to next reaction:', { from: this.currentReactionIndex, to: nextIndex });
                this.currentReactionIndex = nextIndex;
                this.loadReaction(this.currentReactionIndex);
            }
        });
    }
}


const ReactionBalancerPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const gameRef = useRef(null);

  // Function to update marks - this will be passed to the Phaser scene
  const handleUpdateMarks = async (points) => {
    if (user && setUser) {
      await updateMark(points, user, setUser);
    }
  };

  // Create a custom scene that has access to the callback
  class CustomBalanceScene extends BalanceScene {
    constructor() {
      super();
      this.updateMarksCallback = handleUpdateMarks;
    }
  }

  // Define the configuration for your Phaser game
  const reactionGameConfig = {
    type: Phaser.AUTO,
    width: 1000,
    height: 650,
    scene: [CustomBalanceScene]
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg p-4 mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Reaction Balancer</h1>
        <p className="text-gray-600">Adjust the numbers to balance the chemical equation!</p>
        {user && (
          <div className="mt-2 text-sm text-gray-500">
            <span>Science Points: {user.points?.science || 0}</span>
            <span className="mx-4">|</span>
            <span>Total Points: {user.points?.totalPoints || 0}</span>
          </div>
        )}
      </div>
      <div className="w-full max-w-5xl rounded-xl shadow-lg overflow-hidden">
        <PhaserGame config={reactionGameConfig} ref={gameRef} />
      </div>
    </div>
  );
};

export default ReactionBalancerPage;
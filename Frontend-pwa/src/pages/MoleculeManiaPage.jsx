// src/pages/MoleculeManiaPage.jsx

import React, { useContext } from 'react';
import Phaser from 'phaser';
import PhaserGame from '../Components/PhaserGame'; // Your reusable component
import { updateMark } from '../utils/updateUserMarks';
import { AuthContext } from '../context/AuthContext';

// --- 1. All of your Molecule Mania game-specific code is placed here ---

const compounds = {
    'H₂O': { name: 'Water', elements: ['H', 'H', 'O'], fact: 'Essential for all known life and covers 71% of Earth\'s surface.' },
    'CO₂': { name: 'Carbon Dioxide', elements: ['C', 'O', 'O'], fact: 'Used by plants for photosynthesis; a key greenhouse gas.' },
    'NaCl': { name: 'Sodium Chloride', elements: ['Na', 'Cl'], fact: 'Commonly known as table salt; an essential nutrient.' },
    'CH₄': { name: 'Methane', elements: ['C', 'H', 'H', 'H', 'H'], fact: 'The main component of natural gas; a potent greenhouse gas.' },
    'O₂': { name: 'Oxygen', elements: ['O', 'O'], fact: 'The gas we breathe to survive, produced by plants.' },
    'HCl': { name: 'Hydrogen Chloride', elements: ['H', 'Cl'], fact: 'A corrosive gas that forms hydrochloric acid when dissolved in water.' },
};

const elementProperties = {
    'H': { color: 0xffffff, name: 'Hydrogen' },
    'O': { color: 0xff4d4d, name: 'Oxygen' },
    'C': { color: 0x666666, name: 'Carbon' },
    'Na': { color: 0x8a2be2, name: 'Sodium' },
    'Cl': { color: 0x32cd32, name: 'Chlorine' },
};

class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
        this.score = 0;
        this.atomsInZone = [];
        this.updateMarksCallback = null; // To hold the function from React
    }

    // --- Paste all other methods from your GameScene here ---
    // (preload, create, initUI, initZones, verifyCombination, etc.)
    // V V V
    preload() {}

    create() {
        this.cameras.main.setBackgroundColor('#87ceeb');
        this.initUI();
        this.initZones();
        this.populateElements();
        this.input.on('dragstart', (p, go) => { this.children.bringToTop(go); go.setScale(1.2); });
        this.input.on('drag', (p, go, dragX, dragY) => { go.x = dragX; go.y = dragY; });
        this.input.on('dragend', (p, go) => {
            go.setScale(1);
            const inZone = Phaser.Geom.Intersects.RectangleToRectangle(go.getBounds(), this.combinationZone.getBounds());
            if (inZone) { if (!this.atomsInZone.includes(go)) { this.atomsInZone.push(go); } }
            else { this.atomsInZone = this.atomsInZone.filter(atom => atom !== go); }
        });
    }

    initUI() {
        this.add.text(400, 40, 'Molecule Mania', { fontSize: '36px', fill: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        this.add.text(400, 75, 'Drag elements into the zone to form compounds!', { fontSize: '18px', fill: '#ffffff' }).setOrigin(0.5);
        this.scoreText = this.add.text(650, 40, 'Score: 0', { fontSize: '24px', fill: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        const combineBtn = this.add.graphics({ fillStyle: { color: 0x4CAF50 } }).fillRoundedRect(300, 520, 200, 50, 16).setInteractive(new Phaser.Geom.Rectangle(300, 520, 200, 50), Phaser.Geom.Rectangle.Contains);
        this.add.text(400, 545, 'Combine!', { fontSize: '24px', fill: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        combineBtn.on('pointerdown', () => this.verifyCombination());
        const resetBtn = this.add.graphics({ fillStyle: { color: 0xf44336 } }).fillRoundedRect(20, 520, 150, 50, 16).setInteractive(new Phaser.Geom.Rectangle(20, 520, 150, 50), Phaser.Geom.Rectangle.Contains);
        this.add.text(95, 545, 'Reset', { fontSize: '24px', fill: '#ffffff', fontStyle: 'bold' }).setOrigin(0.5);
        resetBtn.on('pointerdown', () => this.clearCombinationZone());
        this.infoBox = this.add.graphics({fillStyle: {color: 0xffffff, alpha: 0.8}}).fillRoundedRect(200, 200, 400, 200, 15).setVisible(false);
        this.infoText = this.add.text(400, 300, '', { fontSize: '20px', fill: '#333', align: 'center', wordWrap: { width: 380 }}).setOrigin(0.5).setVisible(false);
    }

    initZones() {
        this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.1 } }).fillRoundedRect(20, 120, 150, 380, 10);
        this.add.text(95, 140, 'Elements', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
        this.combinationZone = this.add.zone(475, 310, 500, 380).setRectangleDropZone(500, 380);
        const comboZoneGfx = this.add.graphics({ lineStyle: { width: 3, color: 0xffffff, alpha: 0.7 } });
        comboZoneGfx.strokeRoundedRect(this.combinationZone.x - 250, this.combinationZone.y - 190, 500, 380, 15);
        this.add.text(475, 140, 'Combination Zone', { fontSize: '20px', fill: '#ffffff' }).setOrigin(0.5);
    }
    
    populateElements() {
        ['H', 'O', 'C', 'Na', 'Cl'].forEach((symbol, i) => this.makeSpawner(95, 190 + i * 70, symbol));
    }

    makeSpawner(x, y, symbol) {
        const atomSprite = this.add.container(x, y).setSize(56, 56).setInteractive();
        const circle = this.add.graphics().fillStyle(elementProperties[symbol].color, 1).fillCircle(0, 0, 28).lineStyle(2, 0x333333, 1).strokeCircle(0, 0, 28);
        const text = this.add.text(0, 0, symbol, { fontSize: '26px', fill: '#333333', fontStyle: 'bold' }).setOrigin(0.5);
        atomSprite.add([circle, text]);
        atomSprite.on('pointerdown', () => this.makeDraggableAtom(x, y, symbol));
        atomSprite.on('pointerover', () => { this.game.canvas.style.cursor = 'pointer'; this.tweens.add({ targets: atomSprite, scale: 1.1, duration: 150 }); });
        atomSprite.on('pointerout', () => { this.game.canvas.style.cursor = 'default'; this.tweens.add({ targets: atomSprite, scale: 1, duration: 150 }); });
    }

    makeDraggableAtom(x, y, symbol) {
        const atomSprite = this.add.container(x, y).setSize(50, 50).setInteractive().setData('symbol', symbol);
        const circle = this.add.graphics().fillStyle(elementProperties[symbol].color, 1).fillCircle(0, 0, 25).lineStyle(2, 0x333333, 1).strokeCircle(0, 0, 25);
        const text = this.add.text(0, 0, symbol, { fontSize: '24px', fill: '#333333', fontStyle: 'bold' }).setOrigin(0.5);
        atomSprite.add([circle, text]);
        this.input.setDraggable(atomSprite);
        return atomSprite;
    }

    verifyCombination() {
        if (this.atomsInZone.length === 0) return;
        const currentElements = this.atomsInZone.map(atom => atom.getData('symbol')).sort();
        let matchFound = false;
        for (const formula in compounds) {
            const requiredElements = [...compounds[formula].elements].sort();
            if (JSON.stringify(currentElements) === JSON.stringify(requiredElements)) {
                this.onSuccess(formula);
                matchFound = true;
                break;
            }
        }
        if (!matchFound) this.onFailure();
    }
    
    onSuccess(formula) {
      console.log("✅ SUCCESS! The onSuccess function was called with formula:", formula);
        // --- This is the key change to connect to React ---
        if (this.updateMarksCallback) {
            this.updateMarksCallback(10); // Award 10 points
        }
        this.score += 10;
        this.scoreText.setText('Score: ' + this.score);
        
        const compound = compounds[formula];
        const successText = `Success! You made ${compound.name} (${formula})\n\nFact: ${compound.fact}`;
        this.displayMessage(successText);

        this.atomsInZone.forEach(atom => atom.destroy());
        this.atomsInZone = [];
    }
    
    onFailure() {
        this.displayMessage('Not a valid compound. Try again!');
        this.atomsInZone.forEach(atom => this.tweens.add({ targets: atom, x: atom.x + Phaser.Math.Between(-10, 10), yoyo: true, repeat: 3, duration: 50, ease: 'Sine.easeInOut' }));
    }
    
    clearCombinationZone() {
        this.atomsInZone.forEach(atom => atom.destroy());
        this.atomsInZone = [];
    }
    
    displayMessage(message) {
        this.infoText.setText(message);
        this.infoBox.setVisible(true).setAlpha(0);
        this.infoText.setVisible(true).setAlpha(0);
        this.tweens.add({
            targets: [this.infoBox, this.infoText], alpha: 1, duration: 500, ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(4000, () => this.tweens.add({
                    targets: [this.infoBox, this.infoText], alpha: 0, duration: 500, ease: 'Power2',
                    onComplete: () => { this.infoBox.setVisible(false); this.infoText.setVisible(false); }
                }));
            }
        });
    }
}

// --- 2. The React Component that hosts the game ---

const MoleculeManiaPage = () => {
    const { user, setUser } = useContext(AuthContext);

    // This function will be passed to the Phaser scene to update the user's score
    const handleScoreUpdate = async (points) => {
        if (user && setUser) {
            await updateMark(points, user, setUser);
        }
    };

    // Create a custom scene class that receives our callback
    class CustomGameScene extends GameScene {
        constructor() {
            super();
            this.updateMarksCallback = handleScoreUpdate;
        }
    }

    // Define the configuration for this specific game
    const moleculeGameConfig = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [CustomGameScene]
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-4">
            <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-4 mb-4 text-center">
                <h1 className="text-2xl font-bold text-gray-800">Molecule Mania</h1>
                <p className="text-gray-600">Drag and drop elements to build molecules!</p>
                {user && (
                    <div className="mt-2 text-sm text-gray-500">
                        <span>Science Points: {user.points?.science || 0}</span>
                        <span className="mx-4">|</span>
                        <span>Total Points: {user.points?.totalPoints || 0}</span>
                    </div>
                )}
            </div>
            <div className="w-full max-w-4xl rounded-xl shadow-lg overflow-hidden">
                {/* Your reusable Phaser component does all the work! */}
                <PhaserGame config={moleculeGameConfig} />
            </div>
        </div>
    );
};

export default MoleculeManiaPage;
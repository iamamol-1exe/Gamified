import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const   PhaserGame = ({ config }) => {
  const gameContainerRef = useRef(null);
  const gameInstance = useRef(null);

  useEffect(() => {
    if (gameContainerRef.current && !gameInstance.current) {
      // Create the Phaser game instance and attach it to the div
      gameInstance.current = new Phaser.Game({
        ...config,
        parent: gameContainerRef.current,
      });
    }

    // Cleanup function to destroy the game instance when the component unmounts
    return () => {
      if (gameInstance.current) {
        gameInstance.current.destroy(true);
        gameInstance.current = null;
      }
    };
  }, [config]); // Rerun effect if config changes

  return <div ref={gameContainerRef} id="game-container" />;
};

export default PhaserGame;
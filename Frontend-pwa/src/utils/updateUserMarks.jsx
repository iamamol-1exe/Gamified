import synchronizedUser from "./syncUser";

export const updateMark = async (mark, user, setUser) => {
    if (!user || !setUser) {
        console.error("User or setUser is not available");
        return;
    }
    
    try {
        const subject = "science"; // Reaction balancer is a chemistry/science game
        const points = user.points || {};
        const streaks = user.streaks || {};
        const gamesSolved = streaks.gamesSolved || {};
        
        // Initialize subject points and totalPoints if they don't exist
        points[subject] = (points[subject] || 0) + mark;
        points.totalPoints = (points.totalPoints || 0) + mark;
        
        // Update games solved count for science subject
        gamesSolved[subject] = (gamesSolved[subject] || 0) + 1;
        
        const newStreaks = { ...streaks, gamesSolved };
        
        // Create a new user object with the updated points
        const updatedUser = { ...user, points, streaks: newStreaks };
        
        // Sync with server
        await synchronizedUser(updatedUser);
        
        // Update local state
        setUser(updatedUser);
        
        console.log(`Updated ${subject} points by ${mark}. New total: ${points.totalPoints}`);
        console.log("Updated user:", updatedUser);
        
    } catch (error) {
        console.error("Error updating user marks:", error);
    }
};
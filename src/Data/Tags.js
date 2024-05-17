import React from 'react';
import "../CSS/Tags.css";

function Tags (props) {
    // Check if tags prop exists and is an array
    if (!Array.isArray(props.tags) || props.tags.length === 0) {
        return null; // Render nothing if tags array is empty or not an array
    }

    // Map over tags array
    const tags = props.tags.map((tag, i) => {
        return <li key={i}>{tag}</li>;
    });

    return (
        <div>
            <ul>
                {tags}
            </ul>
        </div>
    );
}

export default Tags;

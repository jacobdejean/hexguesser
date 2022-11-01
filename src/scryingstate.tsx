import React from "react";

export function useState<Type>(initialState: (() => Type) | Type) {
    return withScrier(React.useState(initialState));
}

export function withScrier<Type>(stateHook: [Type, React.Dispatch<React.SetStateAction<Type>>]) {
    return 
}
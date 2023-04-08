import useNavigation from "../hooks/use-navigation";

const Route2 = ({ path, children }) => {
    const { currentPath } = useNavigation();

    if (path === currentPath) {
        return children;
    }

    return null;
};

export default Route2;

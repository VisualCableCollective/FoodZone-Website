import {Navbar} from "../../components/Navbar";

export const  MainLayout = (props) => {
    return (
        <div>
            <Navbar />
            {props.children}
        </div>
    )
}

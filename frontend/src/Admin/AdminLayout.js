import ItemList from "./ItemList";

export default function AdminLayout({data}){
    return(
        <>
            <h4>Admin Page</h4>
            <ItemList layout={data}/>
        </>
    )
}
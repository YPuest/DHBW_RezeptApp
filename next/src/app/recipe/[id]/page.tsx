import Recipe from "../../../components/Recipe";

export default function Page({ params }) {
    return (
        <div>
            <div>My Recipe: {params.id}</div>
            <Recipe id={params.id}/>
        </div>
    )
}
import Content from './Content'
import Total from './Total'

const Part = (props) => {
    return(
        <>
            <Content content={props.part} />
            <Total total={props.exercises} />
        </>
    )
}

export default Part
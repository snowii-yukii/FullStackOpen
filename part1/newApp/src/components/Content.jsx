const Content = (props) => {
    return(
        props.contents.map((content) => (
            <p key={content}>{content}</p>
        ))
    )
}

export default Content
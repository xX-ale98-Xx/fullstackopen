import Header from './Header'
import Content from './Content'
import Total from './Total'

export default function Course({course}){

    return(
        <div>
            <Header name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/> 
        </div>
    )

}
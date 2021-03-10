import React from 'react';

const CourseList = React.Component {
    render() {
        {courses.map((course, i) => {
            return (<Button index={course} onClick={e=>{rmCourse(i); console.log(courses)}}>CS {course}
            <CloseIcon/></Button>)
        })}
    }
}

export default CourseList;
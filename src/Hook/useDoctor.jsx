import { useEffect, useState } from "react"

const useDoctor = email => {
    const [isDoctor, setIsDoctor] = useState(false);
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/user/doctor/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsDoctor(data.isDoctor)
                })
        }
    }, [email])
    return [isDoctor]
}

export default useDoctor;
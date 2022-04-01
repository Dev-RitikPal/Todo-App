import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        onAuthStateChanged, signOut } from '@firebase/auth'
import { collection, setDoc, getDoc, doc,getDocs, updateDoc, deleteDoc } from '@firebase/firestore';

import { auth, dbref,db } from '.';

const pathref = collection(db, "todos");

export const UserSignup = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password)
}

export const UserLogin = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

export const UserLogout = async () =>{
    try{
        return await signOut(auth)
    } catch (error){
        return error.message 
    }
}

export const AddingUserdata = async (username,email,phone,address,country,state,city,zipcode,profile,blogId) => {
    return await setDoc(doc(dbref, email), {
        username: username.charAt(0)?.toUpperCase() + username.slice(1),
        email: email,
        phone: phone,
        address: address,
        country: country,
        state: state,
        city: city,
        zipcode: zipcode,
        profileimage : profile,
        Favoriteblogs : blogId || []
    });
}

export const HandleUpdateUserData = async (username, email, phone, address, zipcode, profilephoto) => {
    console.log(username, email, phone, address, zipcode, profilephoto,"fhdkdfj")
    try {
        const updatedata = doc(dbref, email);
        return await updateDoc(updatedata, { 
            username: username.charAt(0)?.toUpperCase() + username.slice(1),
            email : email,
            phone: phone,
            address: address,
            // country: country,
            // state: state,
            // city: city,
            zipcode: zipcode,
            profileimage : profilephoto 
        })
    } catch (error) {
        return error.message
    }
}

export const HandleAddingFavrioteBlog = async (Favoriteblogs) => {
    try {
        const updatedata = doc(dbref, auth?.currentUser?.email);
        return await updateDoc(updatedata, { 
            favrouteblogs: Favoriteblogs,
        })
    } catch (error) {
        return error.message
    }
}


export const addTodos = async (addtask, category, description ) => {
    const today = new Date() 
    const date  = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    const time  = today.toLocaleString('en-US', { hour: 'numeric', minute : 'numeric', hour12: true })
    try {
        const todosData = collection(pathref,auth.currentUser.uid +"/data")
        const res = await setDoc(doc(todosData), {
            date: date,
            time: time,
            status: "Active",
            todo: addtask,
            category: category,
            description: description.charAt(0)?.toUpperCase() + description.slice(1)
        })
        console.log(res,"todoresponse")
        if (res) {
            return res 
        } else {
            return "something went wrong"
        }
    } catch (error) {
        return error.message
    }
}

export const GetUserdata = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(dbref,auth.currentUser.email);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    resolve(docSnap.data())
                } else {
                    reject(null);
                    toast.error("No such document!");
                }
            } else {
                // toast.error("User not found")
            }
        });
    })
}

export const GetUsertodoData = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const querySnapshot = await getDocs(collection(db, "todos", auth.currentUser.uid, "data"));
                if(querySnapshot){
                    let todotasks =[];
                    querySnapshot.forEach((doc) => {
                        let tododata = doc.data();
                        let todoid = doc.id;
                        todotasks.push({...tododata, todoid})
                    });
                    resolve(todotasks)
                } else {
                    reject(null);
                    toast.error("No such document!");
                }
            } else {
                toast.error("User not found")
            };
        })
    })
}

export const Updatetaskname = async (id, taskname, taskdesc) => {
    try {
        const updatedata = doc(pathref, auth.currentUser.uid+"/data/"+id);
        return await updateDoc(updatedata, { todo : taskname?.charAt(0)?.toUpperCase() + taskname?.slice(1), description : taskdesc?.charAt(0)?.toUpperCase() + taskdesc?.slice(1) })
    } catch (error) {
        return error.message
    }

}

export const updatetaskdesc = async (id,taskdesc) => {
    try {
        const updatedata = doc(pathref, auth.currentUser.uid+"/data/"+id);
        return await updateDoc(updatedata, { description : taskdesc.charAt(0)?.toUpperCase() + taskdesc.slice(1)  })
    } catch (error) {
        return error.message
    }

}

export const UpdateActiveTodo = async (id) => {
    try {
        const updatedata = doc(pathref, auth.currentUser.uid+"/data/"+id);
        return await updateDoc(updatedata, { status : "Active" })
    } catch (error) {
        return error.message
    }
}

export const UpdateCompletedTodo = async (id) => {
    try {
        const updatedata = doc(pathref, auth.currentUser.uid+"/data/"+id);
        return await updateDoc(updatedata, { status : "Completed" })
    } catch (error) {
       return error.message
    }
}

export const HandleDeletingTask = async (id) => {
    try {
        return await deleteDoc(doc(pathref,auth.currentUser.uid+"/data/"+id));
    } catch (error) {
        return error.message
    }
}

export const HandleAddingBlog = async (Name, title , data, image ) => {
    
    const today = new Date() 
    const date  = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear()
    const time  = today.toLocaleString('en-US', { hour: 'numeric', minute : 'numeric', hour12: true })
    
    try {
        const todosData = collection(db, "Blogs","/allblogs","/data")
        const res = await setDoc(doc(todosData), {
            date : date,
            time : time,
            Name : Name,
            Blogdetail: data,
            Title : title,
            uid : auth.currentUser.uid,
            image,
        })
        if (res) {
            return res 
        } else {
            return "something went wrong"
        }
    } catch (error) {
        return error.message
    }
}

export const HandleupdatingBlog = async (BlogTitle, Blogdescription,image, blogidref) => {
    try {
        const updatingpath = doc(db, "Blogs", "allblogs", "data",blogidref)
        return await updateDoc(updatingpath, { Title : BlogTitle, Blogdetail : Blogdescription, image : image })    
    } catch (error) {
        return error.message
    }
}

export const GetBlogsData = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const querySnapshot = await getDocs(collection(db, "Blogs","allblogs","data"));
                if(querySnapshot){
                    let Blogs =[];
                    querySnapshot.forEach((doc) => {
                        let blogdata = doc.data();
                        let blogid = doc.id;
                        Blogs.push({...blogdata, blogid})
                    });
                    resolve(Blogs)
                } else {
                    reject(null);
                    toast.error("No such document!");
                }
            } else {
                toast.error("User not found")
            };
        })
    })
}

export const HandleDeletingBlog = async (blogid) =>{
    try {
        const deleteblog = doc(db, "Blogs", "allblogs", "data",blogid)
        return await deleteDoc(deleteblog);
    } catch (error) {
        console.log(error.message)
        // return error.message
    }

}
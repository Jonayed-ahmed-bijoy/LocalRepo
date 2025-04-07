import { useState, useEffect } from 'react';
import './booksearch.css';
import axios from 'axios';

const Bh=()=>
{
    const [books, setbooks] = useState([]);
  

    useEffect(()=>
    {
        const fetch = async()=>
        {
            try
            {
               const res = await axios.get("http://localhost:3001/alldata");
               setbooks(res.data)
            }
            catch(err)
            {
                console.log('Error While Fetching Data')
            }
        };
        fetch();
    },
    []);


    return(
        <section>
            <div className='pp'>
                <h1>BooooooooK</h1>
            </div>
            <div className='container'>
                {
                     books.map((books)=>
                        {
                            const { email,password}= books;
                            return(
                                <div className='cards'>
                                <div className='img'>
                        <img src="https://cdn.pixabay.com/photo/2015/11/19/21/10/glasses-1052010_960_720.jpg" alt='Avatar' width="100%"/>
                    </div>
                    <div className='details'>
                    <div className='two column'>
                        <p>{email}</p>
                        <p>{password}</p>
                        </div>
                        </div>
                        </div>

                            );
                        })}
        </div>
        </section>
          
    );
};

export default Bh;





 
 
 
 
 
 
 
 /*<form>
        {books.map((books)=>
        {
            return
            {
            
            }
        })}
        </form>*/
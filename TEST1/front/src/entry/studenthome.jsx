import { Link } from "react-router-dom";

function Ss()
{
    return(
        <form>
      <label>Book Name
        <input type="text" placeholder="Enter Book Name" name = "Book"  required/>
      </label>
      <input type="submit" value ="Search"/>
       <Link to="/bookhistory"><button>Book History </button></Link>
       <Link to="/returndue"><button>Return Duey </button></Link>
       <Link to="/applyroom"><button>Room </button></Link>
       <Link to="/librarycard"><button>Library Card </button></Link>
       <Link to="/logout"><button>Logout </button></Link>
    </form>
    );
}

export default Ss;
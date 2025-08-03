// const Other = () => {
//   return <div>Other</div>;
// };

import { Link, Outlet } from "react-router-dom";


// export default Other;





export default function Other() {



  return (<>

    <header>

      <div className="flex">
        <Link to={'/cotegory'}>
          <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300">Cotegory</button>
        </Link>
        <Link to={'/brands'}>
          <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300">Brands</button>
        </Link>
        <Link to={'/banner'}>
          <button className="w-[110px] h-[40px] rounded-[10px] hover:text-[#1D4ED8] hover:bg-blue-300">Baneer</button>
        </Link>
      </div>
    </header>
    <main><Outlet /></main>

    <section><section className="w-[90%] m-auto ">

        


            <section class="page_404">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-12 ">
                            <div class="col-sm-10 col-sm-offset-1  text-center">
                                <div class="four_zero_four_bg">
                                    <h1 class="text-center ">404</h1>


                                </div>

                                <div class="contant_box_404">
                                    <h3 class="h2">
                                        Look like you're lost
                                    </h3>

                                    <p>the page you are looking for not avaible!</p>

                      
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
</section>

  </>)
}
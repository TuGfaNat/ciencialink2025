import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Courses from './pages/Courses'
import CourseDetails from './pages/CourseDetails'
import About from './pages/About'
import Contact from './pages/Contact'
import Events from './pages/Events'
import Kits from './pages/Kits'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Commissions from './pages/Commissions'
import ScientificRepository from './pages/ScientificRepository'
import ProjectsPortfolio from './pages/ProjectsPortfolio'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="comisiones" element={<Commissions />} />
      <Route path="repositorio" element={<ScientificRepository />} />
      <Route path="proyectos" element={<ProjectsPortfolio />} />
      <Route path="cursos" element={<Courses />} />
      <Route path="cursos/:id" element={<CourseDetails />} />
      <Route path="kits" element={<Kits />} />
      <Route path="blog" element={<Blog />} />
      <Route path="blog/:id" element={<BlogPost />} />
      <Route path="nosotros" element={<About />} />
      <Route path="contacto" element={<Contact />} />
      <Route path="registro" element={<Contact />} />
      <Route path="eventos" element={<Events />} />
    </Route>
  )
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App

import { Outlet } from 'react-router-dom'
import '../components/Forms/Form.css'
import '../components/Forms/Section1.css'

function Forms() {
  return (
    <div className="forms-bg">
      <div
        className="glow absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[110vh] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(20,184,153,0.10), transparent 60%)' }}
      />
      <div
        className="glow absolute bottom-0 right-0 w-[70vw] h-[70vh] pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(20,100,184,0.07), transparent 65%)' }}
      />
      <main className="forms-shell">
        <div className="forms-panel">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Forms

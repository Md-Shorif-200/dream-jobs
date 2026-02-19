import { ChildrenPropsType } from '@/Types/common.type'

const Container = ({children}:ChildrenPropsType) => {
  return (
    <div>
        {children}
    </div>
  )
}

export default Container
import { renderHook, act } from '@testing-library/react-hooks'
import { useTaskForm } from '../../containers/task-form-container'

describe('TaskFormContainer', () => {
  describe('validateTitle', () => {
    it("when title is 'title'", () => {
      const { result } = renderHook(() => useTaskForm())
      act(() => {
        result.current.validateTitle('title')
      })
      expect(result.current.errors.title).toBe('')
    })

    it("when title is ''", () => {
      const { result } = renderHook(() => useTaskForm())
      act(() => {
        result.current.validateTitle('')
      })
      expect(result.current.errors.title).toBe("Title can't be blank")
    })

    it('when title length is 255 orver', () => {
      const { result } = renderHook(() => useTaskForm())
      act(() => {
        result.current.validateTitle('a'.repeat(256))
      })
      expect(result.current.errors.title).toBe(
        'Title is too long (maximum is 255 characters)'
      )
    })
  })

  describe('isValid', () => {
    it('when invalid', () => {
      const { result } = renderHook(() => useTaskForm())
      act(() => {
        result.current.setTaskForm({
          title: 'a',
          description: '',
          done: false
        })
      })
      act(() => {
        expect(result.current.isValid()).toBe(true)
      })
    })

    it('when valid', () => {
      const { result } = renderHook(() => useTaskForm())
      act(() => {
        result.current.setTaskForm({
          title: '',
          description: '',
          done: false
        })
      })
      act(() => {
        expect(result.current.isValid()).toBe(false)
      })
    })
  })
})

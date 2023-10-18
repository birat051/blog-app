
function useLocalStorage() {
    const jwt=localStorage.getItem('jwtToken')
    const userId=localStorage.getItem('userId')
    return [jwt,userId]
}

export default useLocalStorage

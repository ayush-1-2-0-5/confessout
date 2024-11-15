'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card'
import { Label } from '../../../components/ui/label'
export default function SignIn() {
  const [sessionName, setSessionName] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSendOTP = async () => {
    setError('')
    setIsVerifying(true)
    try {
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      })

      if (response.ok) {
        setOtpSent(true)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to send OTP')
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleVerifyOTP = async () => {
    setError('')
    setIsVerifying(true)
    try {
      const verifyResponse = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      })

      if (!verifyResponse.ok) {
        const data = await verifyResponse.json()
        throw new Error(data.error || 'OTP verification failed')
      }

      // If OTP is verified, proceed with sign in
      const result = await signIn('credentials', {
        redirect: false,
        sessionName,
        password,
        phoneNumber,
        otp,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      // If sign in is successful, route to the appropriate confession page
      if (result?.ok) {
        router.push(`/confession/123123`)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-indigo-800">
            Access Your Confession
          </CardTitle>
          <CardDescription className="text-center text-indigo-600">
            Enter your credentials to view your confession
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="sessionName">Session Name</Label>
              <Input
                id="sessionName"
                placeholder="Enter your session name"
                value={sessionName}
                onChange={(e) => setSessionName(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="h-12"
              />
            </div>

            {!otpSent ? (
              <Button 
                type="button"
                onClick={handleSendOTP}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-300 h-12"
                disabled={isVerifying}
              >
                {isVerifying ? 'Sending OTP...' : 'Send OTP'}
              </Button>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter OTP sent to your phone"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="h-12"
                  />
                </div>
                <Button 
                  type="button"
                  onClick={handleVerifyOTP}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white transition-colors duration-300 h-12"
                  disabled={isVerifying}
                >
                  {isVerifying ? 'Verifying...' : 'Access Confession'}
                </Button>
              </>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
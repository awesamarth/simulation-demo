'use client'

import { useState } from 'react'
import { useAccount, useChainId, useSimulateContract, useWriteContract } from 'wagmi'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '@/constants'
import { megaethTestnet } from 'viem/chains'

export default function Home() {
  const [value, setValue] = useState('')
  const [shouldSimulate, setShouldSimulate] = useState(false)
  const { isConnected } = useAccount()
  const chainId = useChainId()
  
  // MegaETH testnet chain ID
  const isCorrectNetwork = chainId === megaethTestnet.id

  const { data: simulateData, error: simulateError } = useSimulateContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'setValue',
    args: [value],
    query: {
      enabled: shouldSimulate && !!value
    }
  })


  const { writeContract, isPending } = useWriteContract()

  const handleSimulate = () => {
    setShouldSimulate(true)
  }

  const handleWriteContract = () => {

    writeContract({
      address: CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'setValue',
      args: [value]
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-2xl font-bold text-center">Counter Contract</h1>
        
        <div className="flex justify-center">
          <w3m-button />
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="value" className="block text-sm font-medium mb-2">
              Counter Value
            </label>
            <input
              id="value"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
                setShouldSimulate(false) 
              }}
              placeholder="Enter a number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-3">
            <button
              onClick={handleSimulate}
              disabled= {!value}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Simulate Transaction
            </button>

            <button
              onClick={handleWriteContract}
              disabled={!isConnected || !isCorrectNetwork || !value || isPending}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {isPending ? 'Writing...' : 'Write Contract'}
            </button>
            
            {isConnected && !isCorrectNetwork && (
              <p className="text-sm text-red-600 text-center">
                Please switch to MegaETH Testnet to write to the contract
              </p>
            )}
            
            {simulateData && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-700">
                  <strong>Simulation Result:</strong> {simulateData.result}
                </p>
              </div>
            )}
            
            {simulateError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-700">
                  <strong>Simulation Error:</strong> {simulateError.message}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}